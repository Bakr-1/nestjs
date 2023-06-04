import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}


    async signup(email: string, password: string) {
        // See if email is in use
        const users = await this.usersService.find(email);
        // If email is in use, throw an error
        if (users.length) {
            throw new BadRequestException('email in use');
        }
        // console.log(users);
        // If email is not in use, hash the password
        // generage salt
        const salt = randomBytes(8).toString('hex');
        
        // hash the password with salt
        const hash = (await promisify(scrypt)(password, salt, 32)) as Buffer;
        
        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');
        console.log(result);
        // Create a new user and save it
        const user = await this.usersService.create(email, result);
        // Return the user
        return user;
    }

    async signin(email: string, password: string) {
        // See if email is in use
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('invalid credentials');
        }
        // If email is in use then check the password
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }
        return user;
        // If password is not valid, throw an error
        // If password is valid, return the user
    }

}