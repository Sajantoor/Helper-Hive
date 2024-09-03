import 'express';
import { TokenData } from '../middlewares/authentication';

declare global {
    namespace Express {
        interface Locals {
            user: TokenData;
        }
    }
}