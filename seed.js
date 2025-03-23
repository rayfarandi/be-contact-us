const bcrypt = require('bcryptjs');
const { User } = require('./models'); // Import model User

async function seedAdmin(){
    try{
        const exitingAdmin = await User.findOne({where:{email:'admin@gmail.com'}})
        if(exitingAdmin){
            console.log('Admin already exists')
            return;
        }

        //hash password
        const hashedPassword = await bcrypt.hash('admin123',10)

        //create admin
        await User.create({
            name:'ray',
            email:'admin@gmail.com',
            password:hashedPassword,
            role:'admin'
        })
        console.log('Admin created successfully')
    }catch(err){
        console.log("Failed to create admin",err)
    }
}

//jalankan fungsi seedAdmin
seedAdmin().then(() => process.exit());