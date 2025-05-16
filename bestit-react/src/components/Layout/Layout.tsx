import Sidebar from "../Sidebar/Sidebar"
import Nav from "../Nav/Nav"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Nav />
        <div className="layout">
            <Sidebar />
            <main className="content">
                {children}
            </main>
        </div>
        </div>
    )
}

export default Layout;