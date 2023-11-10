export default function PageTitle({ children }: { children: React.ReactNode }) {
    return(
        <div className="flex h-24 items-end">
            <h1 className="leading-none">{children}</h1>
        </div>
    );
}