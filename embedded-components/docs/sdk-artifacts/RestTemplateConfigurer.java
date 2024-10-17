package net.jpmchase.architecture.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.tools.javac.Main;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClientBuilder;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManager;
import org.apache.hc.client5.http.impl.io.PoolingHttpClientConnectionManagerBuilder;
import org.apache.hc.client5.http.ssl.SSLConnectionSocketFactory;
import org.apache.hc.core5.http.HttpHost;
import org.springframework.http.MediaType;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.client.support.HttpRequestWrapper;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.SecureRandom;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

/**
 * This purpose of this class is to create a rest template instance with the Mutual TLS authentication and payload signing.
 * The created rest template is to be used with the APIClient from the auto generated code - so every api call made will be authenticated.
 */
@Slf4j
public class RestTemplateConfigurer {

    /**
     * Provide the MTLSConfiguration instance that contains your mutual tls details for creating a rest template that support mutual tls authentication.
     *
     * @param mtlsConfiguration - MTLSConfiguration instance with your mutual tls details, for more info see {@link MTLSConfiguration}
     * @return - RestTemplate created based on the provided MTLSConfiguration
     */
    public RestTemplate restTemplate(MTLSConfiguration mtlsConfiguration) {

        RestTemplate restTemplate = new RestTemplate();

        Optional.ofNullable(mtlsConfiguration).ifPresent(config -> {
            configureMTLS(restTemplate, config);
            Optional.ofNullable(config.getCertSigningPrivateKeyLocation())
                    .ifPresent(location -> configurePayloadSigning(restTemplate, config));
        });

        if (log.isDebugEnabled()) {
            wrapRequestFactoryWithLoggableFactory(restTemplate);
        }

        return restTemplate;
    }

    /**
     * If the MTLSConfiguration provided contains the certSigningPrivateKeyLocation, then this method will add an interceptor on the rest template to facilitate payload signing.
     * <p>
     * Enabling debug logs on this class will show you more detailed logs on the payload signing process.
     *
     * @param restTemplate - RestTemplate instance to be configured with digital payload signing interceptor
     * @param mtlsConfiguration - MTLSConfiguration instance with your mutual tls details, for more info see {@link MTLSConfiguration}
     */
    @SneakyThrows
    private void configurePayloadSigning(RestTemplate restTemplate, MTLSConfiguration mtlsConfiguration) {
        restTemplate.getInterceptors().add((request, body, execution) -> {
            log.info("Sending Request to {}", request.getURI());

            if (body.length == 0) {
                return execution.execute(request, body);
            }

            ByteBuffer byteBuffer = ByteBuffer.wrap(body);

            String requestBody = StandardCharsets.UTF_8.decode(byteBuffer).toString();

            log.debug("Request Body before signing: {}", requestBody);

            String signedBody = signPayload(requestBody, new String(Objects.requireNonNull(Main.class.getClassLoader()
                    .getResourceAsStream(mtlsConfiguration.getCertSigningPrivateKeyLocation())).readAllBytes()));

            log.debug("Request Body after signing: {}", signedBody);

            HttpRequestWrapper requestWrapper = new HttpRequestWrapper(request);
            requestWrapper.getHeaders().setContentType(MediaType.TEXT_PLAIN);
            byte[] signedBodyBytes = signedBody.getBytes();
            requestWrapper.getHeaders().setContentLength(signedBodyBytes.length);

            log.debug("Request headers: {}", requestWrapper.getHeaders());
            return execution.execute(requestWrapper, signedBodyBytes);

        });
    }

    /**
     * If the MTLSConfiguration provided contains the mtlsCertLocation, then this method will create a ssl context on the rest template with the certificate details provided.
     * And in case no certificate details, this methods creates a rest template with no ssl context.
     *
     * In case you require your requests to go via a proxy, then you can provide the proxy details in the MTLSConfiguration which will be used on the http client in the rest template .
     * @param restTemplate - RestTemplate instance to be configured with mutual tls
     * @param mtlsConfiguration - MTLSConfiguration instance with your mutual tls details, for more info see {@link MTLSConfiguration}
     */
    @SneakyThrows
    private void configureMTLS(RestTemplate restTemplate, MTLSConfiguration mtlsConfiguration) {

        PoolingHttpClientConnectionManagerBuilder builder = PoolingHttpClientConnectionManagerBuilder.create();
        PoolingHttpClientConnectionManager cm;

        if (mtlsConfiguration.getMtlsCertLocation() != null) {
            // Load the keystore
            KeyStore pkcs12KeyStore = KeyStore.getInstance("PKCS12");
            pkcs12KeyStore.load(RestTemplateConfigurer.class.getClassLoader()
                            .getResourceAsStream(mtlsConfiguration.getMtlsCertLocation()),
                    mtlsConfiguration.getMtlsCertPassword().toCharArray());

            // Configure a secure socket
            KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(
                    KeyManagerFactory.getDefaultAlgorithm());
            keyManagerFactory.init(pkcs12KeyStore, mtlsConfiguration.getMtlsCertPassword().toCharArray());

            SSLContext sslContext = SSLContext.getInstance("TLS");

            sslContext.init(keyManagerFactory.getKeyManagers(), null, new SecureRandom());

            SSLConnectionSocketFactory sslConFactory = new SSLConnectionSocketFactory(sslContext);

            // Create an HttpClient that uses the custom SSLContext
            cm = builder.setSSLSocketFactory(sslConFactory).build();

        } else {
            cm = builder.build();
        }

        HttpClientBuilder httpClientBuilder = HttpClients.custom().setConnectionManager(cm);

        if (StringUtils.hasText(mtlsConfiguration.getProxy())) {
            httpClientBuilder.setProxy(HttpHost.create(mtlsConfiguration.getProxy()));
        }

        CloseableHttpClient httpClient = httpClientBuilder.build();

        ClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
        // Set the custom ClientHttpRequestFactory in the RestTemplate
        restTemplate.setRequestFactory(requestFactory);
    }

    /**
     * <p>
     * Setting debugging will print debug logs for request and responses and will switch the rest template to use the {@link org.springframework.http.client.BufferingClientHttpRequestFactory}.
     * <p>
     * The {@link org.springframework.http.client.BufferingClientHttpRequestFactory} has performance drawbacks and could result in out of memory errors. Please see
     * <a href="https://www.baeldung.com/spring-resttemplate-logging#2-using-interceptor-with-resttemplate">The following article</a>
     */
    private void wrapRequestFactoryWithLoggableFactory(RestTemplate restTemplate) {
        ClientHttpRequestFactory originalRequestFactory = restTemplate.getRequestFactory();
        if (!(originalRequestFactory instanceof BufferingClientHttpRequestFactory)) {
            restTemplate.setRequestFactory(new BufferingClientHttpRequestFactory(originalRequestFactory));
        }
    }

    @SneakyThrows
    private static PrivateKey gatherPrivateKey(String key) {

        String privateKeyPEM = key.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "")
                .replaceAll("\\s+", ""); // Remove all line breaks and spaces

        byte[] encoded = Decoders.BASE64.decode(privateKeyPEM);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");

        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(encoded);
        return keyFactory.generatePrivate(keySpec);
    }

    /**
     * This is the method that does the payload signing before sending the request.
     * @param payload - request body that is to be digitally signed
     * @param privateKey - private key that will be used for signing
     * @return - signed request body
     */
    @SneakyThrows
    public static String signPayload(String payload, String privateKey) {
        ObjectMapper objectMapper = new ObjectMapper();
        JwtBuilder jwtBuilder = Jwts.builder();
        Map claims = objectMapper.readValue(payload, Map.class);
        log.debug("Setting signing claims to {}", claims);
        jwtBuilder.setClaims(claims);
        jwtBuilder.signWith(gatherPrivateKey(privateKey), SignatureAlgorithm.RS256);
        return jwtBuilder.compact();
    }

}