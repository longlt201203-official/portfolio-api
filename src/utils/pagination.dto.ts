export class PaginationDto {
	page: number;
	take: number;
	totalRecord: number;
	totalPage: number;
	nextPage?: number;
	prevPage?: number;

	constructor(page: number, limit: number, totalRecord: number) {}
}
