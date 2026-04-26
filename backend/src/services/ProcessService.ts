interface Step {
    id: string;
    title: string;
    description: string;
    order: number;
}

interface ProcessResponse {
    mode: "general" | "region-specific";
    steps: Step[];
}

export class ProcessService {
    public static getProcessForRegion(region?: string): ProcessResponse {
        const cleanRegion = region?.toLowerCase().trim();

        if (cleanRegion === 'india') {
            return {
                mode: "region-specific",
                steps: [
                    { id: "in-1", title: "Search Electoral Roll", description: "Verify your name is present in the latest electoral roll on voters.eci.gov.in.", order: 1 },
                    { id: "in-2", title: "Download Voter Slip", description: "Download your digital voter information slip which contains your booth and serial number.", order: 2 },
                    { id: "in-3", title: "Locate Polling Station", description: "Confirm the exact address of your designated polling booth (usually a public school or community center).", order: 3 },
                    { id: "in-4", title: "Verification at Entry", description: "Show your identity proof (EPIC, Aadhar, PAN, etc.) to the First Polling Officer for authentication.", order: 4 },
                    { id: "in-5", title: "Sign Register & Ink mark", description: "The Second Polling Officer will mark your finger with indelible ink and ask you to sign the register (Form 17A).", order: 5 },
                    { id: "in-6", title: "EVM Activation", description: "The Third Polling Officer will activate the Electronic Voting Machine (EVM) for your vote.", order: 6 },
                    { id: "in-7", title: "Cast Your Vote", description: "Enter the voting compartment and press the blue button next to your chosen candidate's symbol on the EVM.", order: 7 },
                    { id: "in-8", title: "Confirm VVPAT", description: "Watch the VVPAT machine's window for 7 seconds to confirm the glass printed slip matches your choice.", order: 8 }
                ]
            };
        }

        if (cleanRegion === 'us' || cleanRegion === 'usa' || cleanRegion === 'united states') {
            return {
                mode: "region-specific",
                steps: [
                    { id: "us-1", title: "Voter Registration", description: "Register online, by mail, or at the DMV at least 30 days before the election (varies by state).", order: 1 },
                    { id: "us-2", title: "Select Voting Method", description: "Choose between Mail-in/Absentee, Early Voting, or In-person voting on Election Day.", order: 2 },
                    { id: "us-3", title: "Review Sample Ballot", description: "Read through the sample ballot provided by your local board of elections to prepare for candidates and local measures.", order: 3 },
                    { id: "us-4", title: "Find Polling Location", description: "Use official state tools to find your authorized polling place or ballot drop box location.", order: 4 },
                    { id: "us-5", title: "Identity Verification", description: "Ensure you have the required form of ID (Photo ID requirements vary significantly by state).", order: 5 },
                    { id: "us-6", title: "Check-in at Polls", description: "Provide your name and address to the election officials to receive your official ballot.", order: 6 },
                    { id: "us-7", title: "Complete Your Ballot", description: "Carefully fill out the paper ballot or use the digital voting interface to make your selections.", order: 7 },
                    { id: "us-8", title: "Cast the Ballot", description: "Submit your ballot into the secure optical scanner or authorized drop box.", order: 8 }
                ]
            };
        }

        return {
            mode: "general",
            steps: [
                { id: "gen-1", title: "Confirm Eligibility", description: "Check age and citizenship requirements for your jurisdiction.", order: 1 },
                { id: "gen-2", title: "Voter Registration", description: "Submit your registration to the local electoral authority before the deadline.", order: 2 },
                { id: "gen-3", title: "Research Platforms", description: "Study candidate platforms and understand the implications of different ballot measures.", order: 3 },
                { id: "gen-4", title: "Identify Polling Venue", description: "Locate where you are supposed to vote or where you can drop off your ballot.", order: 4 },
                { id: "gen-5", title: "Prepare Identification", description: "Gather the necessary documents required to prove your identity at the polls.", order: 5 },
                { id: "gen-6", title: "Vote", description: "Follow local procedures to cast your secret ballot safely and securely.", order: 6 },
                { id: "gen-7", title: "Monitor Results", description: "Follow official channels to see the certified results of the election.", order: 7 }
            ]
        };
    }
}
