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
                    { id: "in-1", title: "Search Electoral Roll", description: "Verify your name is present in the latest electoral roll on voters.eci.gov.in. If not found, you cannot vote even with an ID card.", order: 1 },
                    { id: "in-2", title: "Download Voter Slip", description: "Download your digital voter information slip which contains your polling station name, room number, and serial number.", order: 2 },
                    { id: "in-3", title: "Verify Digital EPIC", description: "Ensure you have your digital Voter ID (e-EPIC) downloaded on your phone or a physical copy ready.", order: 3 },
                    { id: "in-4", title: "Locate Polling Station", description: "Double-check the exact address of your designated polling booth. Use maps to plan your route to avoid morning crowds.", order: 4 },
                    { id: "in-5", title: "Research Candidates (KYC)", description: "Use the ECI 'Know Your Candidate' app to view the background, assets, and criminal records (if any) of candidates in your area.", order: 5 },
                    { id: "in-6", title: "Entry & Identity Check", description: "At the booth, show your identity proof to the First Polling Officer. They will call out your name to verify it against the list.", order: 6 },
                    { id: "in-7", title: "Signature & Ink marking", description: "The Second Polling Officer will apply indelible ink to your left index finger and record your signature in the register (Form 17A).", order: 7 },
                    { id: "in-8", title: "EVM Preparation", description: "The Third Polling Officer will take your voter slip and press the 'Ballot' button on the Control Unit to activate the voting machine.", order: 8 },
                    { id: "in-9", title: "Casting the Ballot", description: "In the private voting compartment, press the blue button next to the name and symbol of your chosen candidate on the EVM.", order: 9 },
                    { id: "in-10", title: "VVPAT Confirmation", description: "Immediately check the VVPAT machine's transparent window. It will show a printed slip with your candidate's name and symbol for 7 seconds before falling into the box.", order: 10 },
                    { id: "in-11", title: "Polling Station Exit", description: "Collect any personal belongings and follow the marked exit path to ensure a smooth flow for other voters.", order: 11 },
                    { id: "in-12", title: "Civic Sharing", description: "While results are secret, sharing your 'Inked Finger' photo encourages others in your community to participate in the democratic process.", order: 12 }
                ]
            };
        }

        if (cleanRegion === 'us' || cleanRegion === 'usa' || cleanRegion === 'united states') {
            return {
                mode: "region-specific",
                steps: [
                    { id: "us-1", title: "Verify Voter Registration", description: "Confirm your registration status with your state's Board of Elections. Deadlines vary but are usually 30 days before Election Day.", order: 1 },
                    { id: "us-2", title: "Review State Ballot Measures", description: "Beyond candidates, states often have specific propositions or tax measures. Read the legal text to understand what 'Yes' or 'No' truly means.", order: 2 },
                    { id: "us-3", title: "Choose Your Voting Plan", description: "Decide if you will vote by mail (requires requesting a ballot early), use early in-person voting, or go to the polls on Election Day.", order: 3 },
                    { id: "us-4", title: "Gather Required Identification", description: "Check if your state requires a Photo ID, a non-photo ID, or just a signature match. Prepare documents like your Driver's License or utility bill.", order: 4 },
                    { id: "us-5", title: "Locate Your Polling Place", description: "Polling locations can change between elections. Verify your specific precinct address via official state web portals.", order: 5 },
                    { id: "us-6", title: "Official Check-in", description: "Provide your name and address to the poll workers. They will verify your eligibility and provide your official ballot or activation card.", order: 6 },
                    { id: "us-7", title: "Marking Your Ballot", description: "Use the provided pen to fill in the ovals on your paper ballot, or follow the touch-screen prompts on the digital voting machine.", order: 7 },
                    { id: "us-8", title: "Ballot Review & Submission", description: "Review your selections one last time. Feed your paper ballot into the optical scanner until it is successfully accepted.", order: 8 },
                    { id: "us-9", title: "Confirmation of Receipt", description: "Ensure the machine or official confirms your vote has been recorded. If a machine rejects your ballot, you are entitled to a fresh one.", order: 9 },
                    { id: "us-10", title: "Participation Token", description: "Collect your 'I Voted' sticker and celebrate your contribution to the electoral process.", order: 10 }
                ]
            };
        }

        return {
            mode: "general",
            steps: [
                { id: "gen-1", title: "Eligibility Check", description: "Confirm you meet age, citizenship, and residency requirements for your current jurisdiction.", order: 1 },
                { id: "gen-2", title: "Registration Process", description: "Submit your voter registration form via the official government portal or local municipal office.", order: 2 },
                { id: "gen-3", title: "Policy & Candidate Research", description: "Examine party manifestos, debate transcripts, and independent candidate analysis to make an informed decision.", order: 3 },
                { id: "gen-4", title: "Logistics Planning", description: "Identify the date, time window, and location of your polling station. Arrange transportation or request a mail-in ballot if needed.", order: 4 },
                { id: "gen-5", title: "Primary ID Preparation", description: "Secure the travel or identity documents required by law to gain entry to the voting area.", order: 5 },
                { id: "gen-6", title: "Casting Secret Ballot", description: "Follow the instructions of electoral staff to cast your vote in private, ensuring no one sees your selection.", order: 6 },
                { id: "gen-7", title: "Result Monitoring", description: "Stay tuned to certified election commission reports for the finalized and audited results of the vote.", order: 7 }
            ]
        };
    }
}
