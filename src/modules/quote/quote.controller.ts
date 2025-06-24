import {
	Controller,
	Param,
	Body,
	Query,
	Post,
	Get,
	Put,
	Delete,
} from "@nestjs/common";
import { QuoteService } from "./quote.service";
import {
	CreateQuoteRequest,
	UpdateQuoteRequest,
	QuoteQuery,
	QuoteResponse,
} from "./dto";
import {
	ApiMessageResponseDto,
	ApiResponseDto,
	SwaggerApiMessageResponse,
	SwaggerApiResponse,
} from "@utils";

@Controller("quotes")
export class QuoteController {
	constructor(private readonly quoteService: QuoteService) {}

	@Post()
	@SwaggerApiMessageResponse()
	async createOne(@Body() dto: CreateQuoteRequest) {
		await this.quoteService.createOne(dto);
		return new ApiMessageResponseDto("Quote created successfully!");
	}

	@Put(":id")
	@SwaggerApiMessageResponse()
	async updateOne(@Param("id") id: string, @Body() dto: UpdateQuoteRequest) {
		await this.quoteService.updateOne(id, dto);
		return new ApiMessageResponseDto("Quote updated successfully!");
	}

	@Get(":id/toggle-visible")
	@SwaggerApiMessageResponse()
	async toggleVisible(@Param("id") id: string) {
		await this.quoteService.toggleVisibility(id);
		return new ApiResponseDto(null, null, "Visibility toggled successfully!");
	}

	@Get()
	@SwaggerApiResponse(QuoteResponse, { isArray: true })
	async findMany(@Query() query: QuoteQuery) {
		const data = await this.quoteService.findMany(query);
		return new ApiResponseDto(
			QuoteResponse.fromDocuments(data),
			null,
			"Quotes retrieved successfully!",
		);
	}

	@Get(":id")
	@SwaggerApiResponse(QuoteResponse)
	async findOne(@Param("id") id: string) {
		const data = await this.quoteService.findOne(id);
		return new ApiResponseDto(
			QuoteResponse.fromDocument(data),
			null,
			"Quote retrieved successfully!",
		);
	}

	@Delete(":id")
	@SwaggerApiMessageResponse()
	async deleteOne(@Param("id") id: string) {
		await this.quoteService.deleteOne(id);
		return new ApiResponseDto(null, null, "Quote deleted successfully!");
	}
}
