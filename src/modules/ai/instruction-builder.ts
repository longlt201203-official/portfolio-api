export class InstructionBuilder {
	private readonly instructions: string[] = [];

	text(t: string) {
		this.instructions.push(t);
		return this;
	}

	newLine() {
		this.instructions.push("\n");
		return this;
	}

	/**
	 *
	 * @param condition
	 * @param x
	 * @param y
	 * @example
	 * conditional(true, "Hello", "World") // Hello
	 * conditional(false, "Hello", "World") // World
	 */
	conditional(condition: boolean, x: string, y?: string) {
		if (condition) {
			this.instructions.push(x);
		} else if (y != undefined) {
			this.instructions.push(y);
		}
		return this;
	}

	build() {
		return this.instructions.join();
	}
}
