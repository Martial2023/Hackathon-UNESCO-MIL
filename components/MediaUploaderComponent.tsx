"use client"

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react"
import { useFileUpload } from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

type Props = {
    setMediaFiles: (files: File[]) => void
    mediaLinks?: string[]
    setMediaLinks?: React.Dispatch<React.SetStateAction<string[]>>
    label?: string
}
export default function MediaUploaderComponent({ setMediaFiles, mediaLinks, setMediaLinks, label }: Props) {
    const maxSizeMB = 2
    const maxSize = maxSizeMB * 1024 * 1024
    const maxFiles = 1

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            getInputProps,
        },
    ] = useFileUpload({
        accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif,video/mp4,video/webm,video/ogg",
        maxSize,
        multiple: true,
        maxFiles
    })

    const removeFileByLink = (fileLink: string) => {
        setMediaLinks?.((mediaLinks: string[]) => mediaLinks.filter(link => link !== fileLink));
    }

    useEffect(() => {
        setMediaFiles(files.map(file => file.file).filter(file => file instanceof File))
    }, [files])

    return (
        <div className="flex flex-col gap-2">
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(event) => {
                    handleDrop(event);
                }}
                data-dragging={isDragging || undefined}
                data-files={files.length > 0 || undefined}
                className="p-2 border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-36 md:min-h-42 flex-col items-center overflow-hidden rounded-xl border border-dashed transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
            >
                <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload image file"
                />
                {files.length > 0 || (mediaLinks && mediaLinks?.length > 0) ? (
                    <div className="flex w-full flex-col gap-3">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="truncate text-sm font-medium">
                                Files ({files.length + (mediaLinks?.length || 0)})
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={openFileDialog}
                                disabled={files.length >= maxFiles}
                            >
                                <UploadIcon
                                    className="-ms-0.5 size-3.5 opacity-60"
                                    aria-hidden="true"
                                />
                                Add
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="bg-accent relative aspect-square rounded-md"
                                >
                                    <img
                                        src={file.preview}
                                        alt={file.file.name}
                                        className="size-full rounded-[inherit] object-cover"
                                    />
                                    <Button
                                        onClick={() => {
                                            removeFile(file.id);
                                        }}
                                        size="icon"
                                        className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                                        aria-label="Remove image"
                                    >
                                        <XIcon className="size-3.5" />
                                    </Button>
                                </div>
                            ))}
                            {mediaLinks?.map((fileLink) => (
                                <div
                                    key={fileLink}
                                    className="bg-accent relative aspect-square rounded-md"
                                >
                                    <img
                                        src={fileLink}
                                        alt={fileLink}
                                        className="size-full rounded-[inherit] object-cover"
                                    />
                                    <Button
                                        onClick={() => {
                                            removeFileByLink(fileLink);
                                        }}
                                        size="icon"
                                        className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                                        aria-label="Remove image"
                                    >
                                        <XIcon className="size-3.5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center px-4 py-2 text-center" onClick={openFileDialog}>
                        <div
                            className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                            aria-hidden="true"
                        >
                            <ImageIcon className="size-4 opacity-60" />
                        </div>
                        <p className="mb-1.5 text-sm font-medium">Drag and drop here</p>
                        <p className="text-muted-foreground text-xs">
                            SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
                        </p>
                        <Button variant="outline" className="mt-4">
                            <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
                            Select {label}
                        </Button>
                    </div>
                )}
            </div>

            {errors.length > 0 && (
                <div
                    className="text-destructive flex items-center gap-1 text-xs"
                    role="alert"
                >
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                </div>
            )}
        </div>
    )
}