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
                    { id: "in-1", title: "Search Electoral Roll", description: "Visit voters.eci.gov.in or use the Voter Helpline App to verify your name, Part Number, and Serial Number in the latest electoral roll.", order: 1 },
                    { id: "in-2", title: "Download Voter Information Slip", description: "Collect your official voter information slip from the ECI portal. This slip contains the room number and booth details for your polling station.", order: 2 },
                    { id: "in-3", title: "Verify Digital EPIC (e-EPIC)", description: "Ensure you have your digital Voter ID (e-EPIC) downloaded or a physical EPIC card ready. 12 other photo IDs (like Aadhar) are also allowed.", order: 3 },
                    { id: "in-4", title: "Locate Your Polling Station", description: "Confirm the exact site address (usually a local school or public office). Plan your route to arrive early to avoid long queues.", order: 4 },
                    { id: "in-5", title: "Research Candidates (KYC)", description: "Use the 'Know Your Candidate' (KYC) app to study the educational background, financial assets, and criminal histories of candidates in your constituency.", order: 5 },
                    { id: "in-6", title: "Entry & Identity Verification", description: "Proceed to the First Polling Officer. They will verify your identity against the marked copy of the electoral roll while calling out your name.", order: 6 },
                    { id: "in-7", title: "Register Signing (Form 17A)", description: "The Second Polling Officer will ask you to sign the Register of Voters (Form 17A) or record your thumb impression.", order: 7 },
                    { id: "in-8", title: "Indelible Ink Marking", description: "The Second Polling Officer will apply indelible ink on your left-hand index finger, marking your participation in the democracy.", order: 8 },
                    { id: "in-9", title: "EVM Activation", description: "The Third Polling Officer will take your voter slip and activate the Electronic Voting Machine (EVM) by pressing the 'Ballot' button on the Control Unit.", order: 9 },
                    { id: "in-10", title: "Cast Your Vote (EVM)", description: "In the private booth, press the blue button next to the name and symbol of your chosen candidate/party on the EVM Ballot Unit.", order: 10 },
                    { id: "in-11", title: "VVPAT Verification", description: "Check the VVPAT machine's transparent window. It will display a printed slip with your candidate's name and serial for 7 seconds before it falls into the box.", order: 11 },
                    { id: "in-12", title: "Station Exit Flow", description: "Collect your ID if you left it at any counter and follow the exit arrows to maintain a smooth queue for other voters.", order: 12 },
                    { id: "in-13", title: "Selfie Point / Civic Pride", description: "While the vote is secret, sharing a photo of your inked finger (without the ballot) at the station's selfie point encourages community voting.", order: 13 }
                ]
            };
        }

        if (cleanRegion === 'us' || cleanRegion === 'usa' || cleanRegion === 'united states') {
            return {
                mode: "region-specific",
                steps: [
                    { id: "us-1", title: "Verify Voter Registration", description: "Check your status with your local county board of elections. Many states require registration at least 30 days before the election date.", order: 1 },
                    { id: "us-2", title: "Review State Ballot Measures", description: "Examine sample ballots for local measures or propositions. Read the full text to understand legal implications of your vote.", order: 2 },
                    { id: "us-3", title: "Select Your Voting Plan", description: "Decide if you will utilize Mail-in/Absentee voting, Early Voting centers, or show up at your polling place on Election Day.", order: 3 },
                    { id: "us-4", title: "Gather Required Identification", description: "Verify state-specific ID laws. Some states require photo ID (DL, Passport), others allow non-photo ID (utility bill, bank statement).", order: 4 },
                    { id: "us-5", title: "Locate Your Precinct Venue", description: "Polling locations can shift. Use your Secretary of State's website to find your authorized polling place or ballot drop box.", order: 5 },
                    { id: "us-6", title: "Check-in & Verification", description: "Provide your information to poll workers. They will check your registration, have you sign the poll book, and provide your ballot.", order: 6 },
                    { id: "us-7", title: "Complete Your Ballot", description: "In a private booth, use the provided pen to fill in your choices on the paper ballot or follow the touch-screen prompts on a DRE machine.", order: 7 },
                    { id: "us-8", title: "Ballot Review", description: "Carefully review your selections. If you make a mistake on a paper ballot, you are entitled to a 'spoiled ballot' and a fresh one.", order: 8 },
                    { id: "us-9", title: "Submit to Optical Scanner", description: "Feed your completed ballot into the secure optical scanner until it is successfully accepted and recorded.", order: 9 },
                    { id: "us-10", title: "Collect 'I Voted' Sticker", description: "Pick up your participation sticker and celebrate your contribution to your local and national representation.", order: 10 }
                ]
            };
        }

        return {
            mode: "general",
            steps: [
                { id: "gen-1", title: "Eligibility Check", description: "Confirm you meet citizenship, age (18+), and residency requirements for your jurisdiction.", order: 1 },
                { id: "gen-2", title: "Registration Process", description: "Complete and submit your registration documents before the official deadline in your area.", order: 2 },
                { id: "gen-3", title: "Research Platforms", description: "Study candidate platforms, voting records, and party manifestos to align with your personal values.", order: 3 },
                { id: "gen-4", title: "Identify Polling Venue", description: "Confirm the location and hours of operation for your polling station or the location of ballot drop boxes.", order: 4 },
                { id: "gen-5", title: "Prepare Identification", description: "Assemble the specific identity documents required by law to gain entry to the voting facility.", order: 5 },
                { id: "gen-6", title: "Cast the Ballot", description: "Follow local procedures to mark and submit your secret ballot in a secure and private manner.", order: 6 },
                { id: "gen-7", title: "Monitor Official Results", description: "Follow certified government channels for the officially audited outcomes of the election process.", order: 7 }
            ]
        };
    }
}
