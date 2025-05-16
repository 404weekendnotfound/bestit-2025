import Sidebar from "../Sidebar/Sidebar"


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
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