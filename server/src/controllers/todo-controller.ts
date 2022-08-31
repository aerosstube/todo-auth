import express from "express";

class TodoController {
    async addTodo(req: express.Request, res: express.Response, next: Function) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async getTodo(req: express.Request, res: express.Response, next: Function) {
        try {

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new TodoController();