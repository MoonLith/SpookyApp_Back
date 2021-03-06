import {
    accountAlreadyExist, accountAlreadyExistWithPhoneNumber,
    accountAlreadyExistWithUsername,
    accountAlreadyFollow,
    accountDoesntExist, accountIsHimself,
    accountNotConnected, accountNotFollowed, alreadyLiked, dataFailedToInsert,
    emailInvalid,
    errorCode, nodata, NONE_CODE, notAlreadyliked,
    passwordInvalid,
    phoneNumberInvalid,
    usernameInvalid,
    wrongPassword
} from "../util";
var awPhoneNumber = require( 'awesome-phonenumber' );
import * as EmailValidator from 'email-validator';
import {CustomError} from "../error/CustomError";
import {isSame} from "../security/passwordManagement";
import {User} from "../../models/User";

export function checkThatUserSignUpCredentialsOrThrow(email : string, password : string, phoneNumber : string, username : string) {

    const pn = new awPhoneNumber(phoneNumber, 'SE');
    if (!email || email == "" || !EmailValidator.validate(email)) {
        throw new CustomError(errorCode, emailInvalid, {});
    }

    if (!password || password == "") {
        throw new CustomError(errorCode, passwordInvalid, {});
    }
    if (!username || username == "") {
        throw new CustomError(errorCode, usernameInvalid, {});
    }

    if (!pn.isValid()) {
        throw new CustomError(errorCode, phoneNumberInvalid, {});
    }

}

export function checkThatUserSignInCredentialsOrThrow(
    password : string, username : string) {

    if (!password || password == "") {
        throw new CustomError(errorCode, passwordInvalid, {});
    }
    if (!username || username == "") {
        throw new CustomError(errorCode, usernameInvalid, {});
    }


}

export async function checkThatPasswordsAreEqualsOrThrow(
    password: string,
    confirmedPassword: string
) {
    if (!(await isSame(confirmedPassword, password))) {
        throw new CustomError(errorCode, wrongPassword, {});
    }
}

export function checkThatUserIsConnected(token : string) {
    if (token == "" || token == null) {
        throw new CustomError(errorCode, accountNotConnected , {});
    }
}

export function checkThatUserisntHimself(user: User, userToAdd : User) {
    if (user.username == userToAdd.username) {
        throw new CustomError(errorCode,accountIsHimself , {});
    }
}
export function checkThatUserExistsOrThrow(user: any) {
    if (!user) {
        throw new CustomError(errorCode, accountDoesntExist, {});
    }
}

export function checkThatDataisInserted(data: any) {
    if (data == errorCode) {
        throw new CustomError(errorCode, dataFailedToInsert, {});
    }
}

export function checkThatDataExist(data: any) {
    if (!data) {
        throw new CustomError(NONE_CODE, nodata, {});
    }
}



export function checkThatUsersExistsOrThrow(user: User[]) {
    if (!user) {
        throw new CustomError(errorCode, accountDoesntExist, {});
    }
}

export function checkThatUserNotAlreadyLike(user: any) {
    if (user) {
        throw new CustomError(errorCode, alreadyLiked, {});
    }
}

export function checkThatUserHasLiked(user: any) {
    if (!user) {
        throw new CustomError(errorCode, notAlreadyliked, {});
    }
}
export function checkThatUserIsNotAlreadyFollow(user: any) {
    if (user) {
        throw new CustomError(errorCode,accountAlreadyFollow , {});
    }
}

export function checkThatUserNotFollowed(user: User) {
    if (!user) {
        throw new CustomError(errorCode,accountNotFollowed , {});
    }
}


export function checkThatUserWithUsernameDoesntExistOrThrow(user: User) {
    if (user) {
        throw new CustomError(errorCode, accountAlreadyExistWithUsername, {});
    }
}
export function checkThatUserDoesntExistOrThrow(user: User) {
    if (user) {
        throw new CustomError(errorCode, accountAlreadyExist, {});
    }
}

export function checkThatUserWithPhoneNumberDoesntExistOrThrow(user: User) {
    if (user) {
        throw new CustomError(errorCode, accountAlreadyExistWithPhoneNumber, {});
    }
}


