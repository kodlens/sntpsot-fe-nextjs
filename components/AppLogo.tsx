import Link from "next/link"

const AppLogo = () => {
    return (
        <Link prefetch={false} className="flex items-center" href={"/"}>
            <img className="h-10 lg:h-12 mr-2" src="/images/logo.png" alt="SNT Post Logo" />
            <img className="h-8 lg:h-8" src="/images/snt-logo.png" alt="SNT Post Logo" />
        </Link>
    )
}

export default AppLogo