import "dotenv/config"
import {PrismaConfig,env} from "prisma/config"

export default {
datasource:{
    url: env("DATABASE_URL")
},
migrations:{
    seed: 'tsx ./prisma/seed.ts'
}
} as PrismaConfig