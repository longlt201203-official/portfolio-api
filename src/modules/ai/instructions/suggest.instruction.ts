import { SuggestRequest } from "../dto";
import { InstructionBuilder } from "../instruction-builder";

export const suggestSystemInstruction = new InstructionBuilder()
	.text("You are a writting expert who can help user to write a blog. ")
	.text(
		"Your job is to suggest title, short description, or content of the blog base on user input.",
	)
	.build();

export const suggestHumanInstruction = (dto: SuggestRequest) =>
	new InstructionBuilder()
		.text("I'm writing a blog and need your help. ")
		.conditional(!!dto.params.title, `I named my blog "${dto.params.title}". `)
		.conditional(
			!!dto.params.shortDescription,
			`I want my blog to have a short description "${dto.params.shortDescription}". `,
		)
		.conditional(
			!!dto.params.content,
			`Currently, I am writing my blog with content:\n`,
		)
		.conditional(!!dto.params.content, dto.params.content)
		.build();
