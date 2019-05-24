package edu.gatech.scheduler;

import io.restassured.RestAssured;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static io.restassured.RestAssured.given;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchedulerApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class GroupTest {

    @LocalServerPort
    private int port;

    @Before
    public void setUp() throws Exception{
        RestAssured.port = Integer.valueOf(port);
        RestAssured.basePath ="/api/user";
        RestAssured.baseURI = "http://localhost";
    }

    @Test
    public void test() {
        given().when().get("/").then().statusCode(200);
    }

}
