package net.javaguides.springboot.dto;

import java.math.BigInteger;

public class HomeDTO {
    private String userName;

    private int databases;
    private int metrics;
    private int queries;

    public HomeDTO(String userName, int databases, int metrics, int queries) {
        this.userName = userName;
        this.databases = databases;
        this.metrics = metrics;
        this.queries = queries;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getDatabases() {
        return databases;
    }

    public void setDatabases(int databases) {
        this.databases = databases;
    }

    public int getMetrics() {
        return metrics;
    }

    public void setMetrics(int metrics) {
        this.metrics = metrics;
    }

    public int getQueries() {
        return queries;
    }

    public void setQueries(int queries) {
        this.queries = queries;
    }
}
