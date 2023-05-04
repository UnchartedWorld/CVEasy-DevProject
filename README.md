# CVEasy - A LaTeX-based CV creation website

CVEasy is a project designed to allow prospective users to create resumes based on
LaTeX templates via a simplistic user interface.

## How to build this project
To build this project requires quite a bit of setup. I'll guide you through it for now.

However, you'll need to clone the project to begin with.

### General requirements
You'll need:
- Ubuntu Linux (as it's the development platform).
- PostgreSQL.
- .NET 6 SDK.
- IDE, such as JetBrains Rider or Visual Studio (although if you know how to configure .NET projects, use whatever works).
- Basic understanding of bash

### .NET 6
There's not much to change here, but you'll need to create your own appsettings.json and appsettings.Development.json. The primary thing you need to add is a connection string, as this is what will allow connections from the server to the actual database. It should look something like this:

```
"ConnectionStrings": {
    "CVEasyDB": "User ID =xxxx; Password=yyyyy; Server=localhost; Port=5432;Database=CVEasyDB; Integrated Security = true; Pooling=true "
}

```

### NPM

You'll need to run in the cveasy-frontend directory:
```
npm install --legacy-peer-deps
```
Unfortunately, due to the usage of a comment section package, namely react-comment-section, it requires the legacy peer deps flag. If you choose to remove that component, then you can merely do `npm install`.

### PostgreSQL
You'll need to utilise the SQL scripts contained in CVEasy API/DB-Script to generate the database tables used in this project. I'd recommend using [pgadmin4](https://www.pgadmin.org/) for this.

You'll also need to configure Postgres to allow for local connections. Your choice of platform determines how best to do this, thus you should research the best solution.

## What is used to make this project?

```
- .NET 6
- JetBrains Rider
- Texlive.js
- PostgresSQL
- Postgres NuGet Package
- ReactJS - ReactDOM
- xUnit
- Ubuntu Linux
```