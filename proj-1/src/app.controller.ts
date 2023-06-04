import { Controller, Get} from "@nestjs/common";

@Controller('/api')
export class AppController {
    @Get('/hi')
    getRootRoute() {
        return "Hello World!";
    }
    @Get('/bye')
    getRootRoute2() {
        return "Hello People!";
    }
}
