package net.jpmchase.architecture.config;

import lombok.Builder;
import lombok.Data;

/**
 * This configuration class is to hold the Mutual TLS details like
 *    - Digital signing private key location e.g. /etc/ssl/certs/sign.pem
 *    - Transport certificate location e.g. e://certs/transport.pem
 *    - Transport certificate password and
 *    - Proxy details, if any e.g. https://proxy.domain.com:8443
 */
@Data
@Builder
public class MTLSConfiguration {

    private String certSigningPrivateKeyLocation;

    private String mtlsCertLocation;

    private String mtlsCertPassword;

    private String proxy;

}