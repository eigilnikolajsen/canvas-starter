import { useEffect, useState } from "react";
import type { VoidComponent } from "../scripts/types";

const DragAndDrop: VoidComponent = () => {
	const [isDragging, setIsDragging] = useState<string>();

	useEffect(() => {
		document.addEventListener("dragenter", onDragStart);
		document.addEventListener("dragover", onDragStart);
		document.addEventListener("dragleave", onDragEnd);
		document.addEventListener("dragend", onDragEnd);
		document.addEventListener("drop", onDrop);

		return (): void => {
			document.removeEventListener("dragenter", onDragStart);
			document.removeEventListener("dragover", onDragStart);
			document.removeEventListener("dragleave", onDragEnd);
			document.removeEventListener("dragend", onDragEnd);
			document.removeEventListener("drop", onDrop);
		};
	}, []);

	const onDragStart = (event: DragEvent): void => {
		event.preventDefault();
		event.stopPropagation();

		if (event.target instanceof HTMLElement) {
			setIsDragging(event.target.dataset.dragAndDrop ?? "");
		}
	};

	const onDragEnd = (event: DragEvent): void => {
		event.preventDefault();
		event.stopPropagation();

		if (
			event.target instanceof HTMLElement
			&& typeof event.target.dataset.dragAndDrop === "string"
		) {
			setIsDragging(undefined);
		}
	};

	const onDrop = async (event: DragEvent): Promise<void> => {
		event.preventDefault();
		event.stopPropagation();

		setIsDragging(undefined);

		if (event.target instanceof HTMLElement && event.dataTransfer?.files?.[0]) {
			console.log(event.dataTransfer.files[0]);
		}
	};

	if (typeof isDragging === "string") {
		return (
			<div className="fixed inset-0 bg-grid flex items-center justify-center">
				Drop {isDragging}
			</div>
		);
	}

	return null;
};

export { DragAndDrop };
