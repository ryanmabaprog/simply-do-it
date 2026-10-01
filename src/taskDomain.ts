export type TaskProps = {
    id: string;
    userId: string;
    title: string;
    description: string | null;
    completed: boolean;
    dueDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateTaskProps = {
    id: string;
    userId: string;
    title: string;
    description?: string | null;
    dueDate?: Date | null;
};

export class Task {
    private constructor(private props: TaskProps) {}

    static create(input: CreateTaskProps): Task {
        const now = new Date();

        return new Task({
            id: input.id,
            userId: input.userId,
            title: Task.validateTitle(input.title),
            description: input.description ?? null,
            completed: false,
            dueDate: input.dueDate ?? null,
            createdAt: now,
            updatedAt: now,
        });
    }

    static reconstitute(props: TaskProps): Task {
        return new Task({
            ...props,
            title: Task.validateTitle(props.title),
        });
    }

    get id(): string {
        return this.props.id;
    }

    get userId(): string {
        return this.props.userId;
    }

    get title(): string {
        return this.props.title;
    }

    get description(): string | null {
        return this.props.description;
    }

    get completed(): boolean {
        return this.props.completed;
    }

    get dueDate(): Date | null {
        return this.props.dueDate;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    complete(): void {
        this.props.completed = true;
        this.touch();
    }

    reopen(): void {
        this.props.completed = false;
        this.touch();
    }

    rename(title: string): void {
        this.props.title = Task.validateTitle(title);
        this.touch();
    }

    changeDescription(description: string | null): void {
        this.props.description = description;
        this.touch();
    }

    changeDueDate(dueDate: Date | null): void {
        this.props.dueDate = dueDate;
        this.touch();
    }

    toJSON(): TaskProps {
        return { ...this.props };
    }

    private touch(): void {
        this.props.updatedAt = new Date();
    }

    private static validateTitle(title: string): string {
        const normalizedTitle = title.trim();

        if (normalizedTitle.length === 0) {
            throw new Error('Task title cannot be empty');
        }

        if (normalizedTitle.length > 255) {
            throw new Error('Task title cannot exceed 255 characters');
        }

        return normalizedTitle;
    }
}

