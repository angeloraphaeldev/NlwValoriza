import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

class ListTagController {
  async handle(req: Request, res: Response) {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.execute();

    return res.json(tags);
  }
}

export { ListTagController };
