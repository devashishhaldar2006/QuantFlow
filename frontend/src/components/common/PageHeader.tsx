type PageHeaderProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {title}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}