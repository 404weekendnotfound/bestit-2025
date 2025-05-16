import Sidebar from "../Sidebar/Sidebar"
import Nav from "../Nav/Nav"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Nav />
        <div className="container layout">
            <Sidebar />
            <main className="content">
                {children}
            </main>
        </div>
        </>
    )
}

export default Layout;