package org.dataverse.people;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("message")
public class MessageResource {

    @GET
    public Response message() throws IOException {
        String out = null;
        java.nio.file.Path pathToDataFile = Paths.get(File.separator + "tmp" + File.separator + "data.tsv");
        if (false && Files.exists(pathToDataFile)) {
            System.out.println("file exists, read it");
            out = new String(Files.readAllBytes(pathToDataFile));
        } else {
            System.out.println("no data file, fetch from remote");
            String url = "https://docs.google.com/spreadsheets/d/1o9DD-MQ0WkrYaEFTD5rF_NtyL8aUISgURsAXSL7Budk/export?gid=0&format=tsv";
            URL website = new URL(url);
            URLConnection connection = website.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String inputLine;
            String newLine = ""; // avoid adding newline at end.
            while ((inputLine = in.readLine()) != null) {
                response.append(newLine);
                String[] columns = inputLine.split("\t");
                System.out.println("num columns: " + columns.length + " " + Arrays.toString(columns));
                String timezone = "";
                if (columns.length > 3) {
                    System.out.println(columns[0] + " installation:" + columns[3]);
                    String installation = columns[3];
                    if (null != installation) {
                        switch (installation) {
                            case "dataverse.ada.edu.au":
                                timezone = "Australia/Canberra";
                                break;
                            case "dataverse.unc.edu":
                                timezone = "America/New_York";
                                break;
                            case "dataverse.harvard.edu":
                                timezone = "America/New_York";
                                break;
                            case "dataverse.lib.virginia.edu":
                                timezone = "America/New_York";
                                break;
                            case "data.qdr.syr.edu":
                                timezone = "America/New_York";
                                break;
                            case "dataverse.tdl.org":
                                timezone = "America/Chicago";
                                break;
                            case "dataverse.asu.edu":
                                timezone = "America/Denver";
                                break;
                            case "dataverse.ucla.edu":
                                timezone = "America/Los_Angeles";
                                break;
                            case "borealisdata.ca":
                                timezone = "America/Toronto";
                                break;
                            case "abacus.library.ubc.ca":
                                timezone = "America/Vancouver";
                                break;
                            case "dataverse.no":
                                timezone = "Europe/Oslo";
                                break;
                            case "dunas.ua.pt":
                                timezone = "Europe/Lisbon";
                                break;
                            case "data.fz-juelich.de":
                                timezone = "Europe/Berlin";
                                break;
                            case "keen.zih.tu-dresden.de":
                                timezone = "Europe/Berlin";
                                break;
                            case "darus.uni-stuttgart.de":
                                timezone = "Europe/Berlin";
                                break;
                            case "heidata.uni-heidelberg.de":
                                timezone = "Europe/Berlin";
                                break;
                            case "data.goettingen-research-online.de":
                                timezone = "Europe/Berlin";
                                break;
                            case "www.sodha.be":
                                timezone = "Europe/Brussels";
                                break;
                            case "rdr.kuleuven.be":
                                timezone = "Europe/Brussels";
                                break;
                            case "data.sciencespo.fr":
                                timezone = "Europe/Paris";
                                break;
                            case "entrepot.recherche.data.gouv.fr":
                                timezone = "Europe/Paris";
                                break;
                            case "dataverse.ird.fr":
                                timezone = "Europe/Paris";
                                break;
                            case "dataverse.nl":
                                timezone = "Europe/Amsterdam";
                                break;
                            case "researchdata.ntu.edu.sg":
                                timezone = "Asia/Singapore";
                                break;
                            case "edatos.consorciomadrono.es":
                                timezone = "Europe/Madrid";
                                break;
                            case "data.cimmyt.org":
                                timezone = "America/Mexico_City";
                                break;
                            default:
                                break;
                        }
                    }
                    inputLine += "\t" + timezone;
                }
                newLine = "\n";
                response.append(inputLine);
            }
            in.close();
            out = response.toString();
            Files.write(pathToDataFile, out.getBytes());
        }
        return Response
                .status(200)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Headers",
                        "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Methods",
                        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .entity(out)
                .build();
    }
}
