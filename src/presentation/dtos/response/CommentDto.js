export class CommentDto {
    id;
    text;
    author;
    createdAt;
    replies;

    constructor(model) {
        this.id = model._id;
        this.text = model.text;
        this.author = model.author.username;
        this.createdAt = model.createdAt;
        this.replies = model.replies?.map(reply => new CommentDto(reply)) || [];
    }
}