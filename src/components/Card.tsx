export default function Card({children, className}) {
    return (
        <div className={"flex justify-center " + className}>
            {children}
        </div>
    );
}