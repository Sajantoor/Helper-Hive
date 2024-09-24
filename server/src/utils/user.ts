import Organization from "../database/models/organization";
import User from "../database/models/user";
import { TokenData } from "../middlewares/authentication";

export async function getUser(data: TokenData) {
    let user;

    if (!data.isOrganization) {
        user = await User.findById(data.userId);
    } else {
        user = await Organization.findById(data.userId);
    }

    return user;
}