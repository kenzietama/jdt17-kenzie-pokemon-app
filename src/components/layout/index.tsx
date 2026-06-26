import Header from "../header";
import Footer from "../footer";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<main className="flex justify-center bg-black h-screen">
			<div className="layout-container w-full max-w-full md:min-w-[480px] md:max-w-[480px] h-screen overflow-hidden flex flex-col">
				<Header />
				<div className="flex-1 bg-amber-100 dark:bg-slate-950 flex flex-col overflow-hidden">
					{children}
				</div>
				<Footer />
			</div>
		</main>
	);
};

export default Layout;
