---
# Esport Lab Benchmarking Platform

Esport Lab is an online experimental psychological platform which is developed with the mission of scaling cognitive measurement to the next level. It applies various types of cognitve tasks from reaction time to working memory and games to gain insight into the psychology of games and mental processes. With the help of such measures we can integrate our observations of different cognitive abilites in one task which is engaging and fun.  

## 🛠️ Built with

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white).
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## 🚀 Installation
To run the Esport Lab Benchmarking Platform locally using Docker:

Ensure you have Docker installed on your machine. If not, download and install it from Docker's official website.
Pull the Docker image from Dockerhub:
    
```
docker pull jozsefkiss90/esportlab:latest
```

Run the Docker container with your MongoDB URI and NextAuth secret:

``` 
docker run -d -p 3000:3000 --env mongoURI='yourmongouri' --env NEXTAUTH_SECRET='yournextauthsecret' jozsefkiss90/esportlab:latest
```

Note: The mongoURI can be obtained from either MongoDB Atlas or MongoDB Compass:

MongoDB Atlas: Set up a cluster on MongoDB Atlas, create a user under the Database Access tab, and obtain your connection string (URI) from the Connect options.

MongoDB Compass: After installing MongoDB Compass, connect to your database and use the connection string (URI) displayed in the application.

## 🖥️ Visit the site

You can open the application [`here`](https://platform-app.herokuapp.com).
   
### 👥 Contribution

Right now I'm looking for deticated esport teams and players who can participate in the experiments.

## 📧 Contact

For any inquiries or contributions, feel free to reach out through esportkutatas@gmail.com.

---
