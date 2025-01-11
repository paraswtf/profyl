import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "./ui/select";

// Menu items.
const items = [
	{
		title: "Domains",
		url: "#"
	},
	{
		title: "Inbox",
		url: "#"
	},
	{
		title: "Calendar",
		url: "#"
	},
	{
		title: "Search",
		url: "#"
	},
	{
		title: "Settings",
		url: "#"
	}
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<Select defaultValue="profyl.in">
							<SelectTrigger>
								<SelectValue placeholder="Select a verified email to display" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="m@example.com">
									m@example.com
								</SelectItem>
								<SelectItem value="m@google.com">
									m@google.com
								</SelectItem>
								<SelectItem value="m@support.com">
									m@support.com
								</SelectItem>
							</SelectContent>
						</Select>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
