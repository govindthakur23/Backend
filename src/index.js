// "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
import connectDB from "./db/index.js";

connectDB()
.then(()=>{

    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is runinng at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo Db Conecctoin Failed", err);
})