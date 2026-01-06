type TagChipsProps = {
  tags: string[]; // Array of tags parsed from JSON
};

export default function TagChips({ tags }: TagChipsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
