import { SuggestRequest } from "../dto";

export const suggestSystemInstruction = `
You are an expert blog writing assistant. Your task is to analyze the provided blog information (current title, short description, and content) and the user's specified field of suggestion (title, short description, or content). Based on this analysis, generate a suggestion for the specified field that is engaging, relevant, and improves the overall quality of the blog. Maintain a professional and informative tone. Only output the suggested text. The content is indicated by XML tag: <content></content>. You must output the suggestion value only.
`;

export const suggestHumanInstruction = (dto: SuggestRequest) => {
	let prompt = `I am writing a blog `;
	if (dto.params.title) {
		prompt += `with the title: "${dto.params.title}". `;
	} else {
		prompt += `without a title. `;
	}
	if (dto.params.shortDescription) {
		prompt += `The short description is: "${dto.params.shortDescription}". `;
	} else {
		prompt += `I don't have a short description. `;
	}
	if (dto.params.content) {
		prompt += `The content is: <content>${dto.params.content}</content>. `;
	} else {
		prompt += `I don't have any content. `;
	}
	prompt += `I want to suggest ${dto.suggestRequestFields.length > 1 ? "these fields" : "a/an"} ${dto.suggestRequestFields.join(", ")} for the blog.`;

	return prompt;
};
