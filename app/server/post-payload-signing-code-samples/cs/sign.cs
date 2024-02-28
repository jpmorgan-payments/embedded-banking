// This code sample generated by GitHub Copilot uses the jose-jwt library to sign a payload using the RS256 algorithm. 
// The payload is a JSON object that is serialized to a string. The private key is read from a file and 
// used to sign the payload. The signature is then printed to the console.

using System;
using System.IO;
using Newtonsoft.Json;
using Jose;
using System.Security.Cryptography;

class Sign
{
    static void Main()
    {
        try
        {
            string privateKey = File.ReadAllText("certs/jpmc-signature.key");

            var header = new { alg = "RS256" };
            string sHeader = JsonConvert.SerializeObject(header);
            string requestData = JsonConvert.SerializeObject(requestDataJSON);

            RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();
            rsa.FromXmlString(privateKey);

            string jws = Jose.JWT.Encode(requestData, rsa, JwsAlgorithm.RS256);
            Console.WriteLine(jws);
        }
        catch (Exception error)
        {
            Console.Error.WriteLine("Could not create signature. Error: " + error.Message);
        }
    }
}