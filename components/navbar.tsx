import Link from "next/link";


export default  function Navbar() {
    const links = [
        { path: "/", label: "Home" },
        { path: "/newPost", label: "New Post" },
        { path: "/services", label: "Services" },
        { path: "/contact", label: "Contact" }
    ];
    return(
        <nav className="bg-gray-600 p-4 text-white">
        <div className="container mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/" className="text-xl font-bold">Blog.</Link>
                </div>
                <div className="space-x-4">
                    {links.map((link, index) => (
                        <Link key={index} href={link.path} className="hover:text-blue-300">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </nav>
)
}