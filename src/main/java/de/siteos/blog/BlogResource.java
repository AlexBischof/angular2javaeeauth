package de.siteos.blog;

import javax.json.JsonArray;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Application;

import static javax.json.Json.createArrayBuilder;
import static javax.json.Json.createObjectBuilder;

/**
 * Created by Alex Bischof on 20.01.2017.
 */
@Path("/")
@ApplicationPath("/rest")
public class BlogResource extends Application
{
	@GET
	public JsonArray blog()
	{
		return
				createArrayBuilder()
						.add(createObjectBuilder().add("name", "blog").build())
						.add(createObjectBuilder().add("name", "blog2").build())
						.build();
	}
}
