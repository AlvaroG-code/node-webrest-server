import { Request, Response } from "express";

const todos = [
    { id: 1, text: "Buy creme", createdAt: new Date() },
    { id: 2, text: "Buy milk", createdAt: new Date() },
    { id: 3, text: "Buy eggs", createdAt: new Date() },
];

export class TodosController {
    // DI //
    constructor() {}

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === Number(id));

        todo
            ? res.json(todo)
            : res.status(404).json({ message: "Todo not found" });
    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Text is required" });
        }

        const newTodo = {
            id: todos.length + 1,
            text,
            createdAt: new Date(),
        };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    };

    public updateTodo = (req: Request, res: Response) => {
        const { id } = req.params;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Text is required" });
        }

        const todo = todos.find((t) => t.id === Number(id));
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        todo.text = text;
        res.json(todo);
    };

    public deleteTodo = (req: Request, res: Response) => {
        const { id } = req.params;
        const index = todos.findIndex((t) => t.id === Number(id));
        if (index === -1) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todos.splice(index, 1);
        res.status(204).send();
    };
}
