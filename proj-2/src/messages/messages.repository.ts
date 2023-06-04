import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository
{
    async findOne(id: string) {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);

        // return messages.find((message: any) => message.id === id);
        return messages[id]
    }

    async findAll() {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);

        return messages;
    }

    async create(text: string) {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);
        
        const id = Math.floor(Math.random() * 999);

        messages[id] = {id , text};

        await writeFile('messages.json', JSON.stringify(messages));
    }
}