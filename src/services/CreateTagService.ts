import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error("Incorrect Name! ");
    }

    // SELECT * FROM tags WHERE NAME = 'name'
    const tagAlreadyExists = await tagsRepositories.findOne({ name: name });
    if (tagAlreadyExists) {
      throw new Error("Tag already exists!");
    }

    const tag = tagsRepositories.create({ name: name });

    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };
