export class NewsDto {
    id;
    title;
    content;
    author;
    createdAt;

    constructor(model) {
        this.id = model._id;
        this.title = model.title;
        this.content = model.content;
        this.author = model.author.username;
        console.log(model.author.username)
        this.createdAt = model.createdAt;
    }
}
