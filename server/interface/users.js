import Router from "koa-router";
import Redis from "koa-redis";
import nodeMailer from "nodemailer"
import User from "../dbs/models/users"
import Passport from "./utils/passport"
import Email from "../dbs/config"
import axios from "./utils/axios"
