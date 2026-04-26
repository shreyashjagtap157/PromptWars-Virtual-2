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
        console.log(`[ProcessService] Fetching steps for region: ${region}`);
        const cleanRegion = region?.toLowerCase().trim();

        if (cleanRegion === 'india') {
            console.log(`[ProcessService] Returning 13 steps for India`);
            return {
                mode: "region-specific",
                steps: [
                    { id: "in-1", title: "Search Electoral Roll", description: "Visit voters.eci.gov.in to verify your name, Part Number, and Serial Number in the latest electoral roll. Ensure you have no 'deleted' status.", order: 1 },
                    { id: "in-2", title: "Download Voter Information Slip", description: "Download your official slip which contains the specific room number and booth details for your polling station.", order: 2 },
                    { id: "in-3", title: "Digital EPIC (e-EPIC) Download", description: "Secure your digital Voter ID (e-EPIC). Note: 12 other photo IDs like Aadhar or Passport are also officially accepted at the booth.", order: 3 },
                    { id: "in-4", title: "Polling Station Logistics", description: "Verify the exact location (usually a local school or public office). Plan your visit for early morning to avoid peak heat and long queues.", order: 4 },
                    { id: "in-5", title: "Review Candidate Background (KYC)", description: "Open the 'Know Your Candidate' (KYC) app. Review the educational, financial, and criminal background of all candidates in your constituency.", order: 5 },
                    { id: "in-6", title: "1st Polling Officer Check", description: "Enter the booth and proceed to the First Polling Officer. They will verify your identity against the marked electoral roll copy.", order: 6 },
                    { id: "in-7", title: "Voter Register Signing (17A)", description: "The Second Polling Officer will record your entry in the Register of Voters (Form 17A) and request your signature or thumb impression.", order: 7 },
                    { id: "in-8", title: "Indelible Ink Application", description: "The Second Polling Officer will apply indelible ink to your left index finger. Ensure it is clearly visible as proof of participation.", order: 8 },
                    { id: "in-9", title: "Control Unit Activation", description: "The Third Polling Officer will collect your slip and press the 'Ballot' button on the Control Unit to activate the voting compartment.", order: 9 },
                    { id: "in-10", title: "Cast Ballot (EVM Unit)", description: "Navigate to the private booth and press the blue button next to your chosen candidate's name and symbol on the EVM Ballot Unit.", order: 10 },
                    { id: "in-11", title: "VVPAT Slip Verification", description: "Immediately check the VVPAT window. A printed slip with your choice will appear for 7 seconds before being deposited into the sealed box.", order: 11 },
                    { id: "in-12", title: "Observe Official Exit", description: "Collect your ID if required and follow the designated exit path. Do not linger inside the polling station perimeter.", order: 12 },
                    { id: "in-13", title: "Selfie Point / Civic Pride", description: "Visit the designated selfie point outside the station to celebrate your contribution to the democratic process with your inked finger.", order: 13 }
                ]
            };
        }

        if (cleanRegion === 'us' || cleanRegion === 'usa' || cleanRegion === 'united states') {
            console.log(`[ProcessService] Returning 10 steps for USA`);
            return {
                mode: "region-specific",
                steps: [
                    { id: "us-1", title: "Verify Voter Registration", description: "Check your status with your local county board of elections. Many states require registration at least 30 days before Election Day.", order: 1 },
                    { id: "us-2", title: "Review Sample Ballot", description: "Review and research all candidates and local measures/propositions ahead of time to make informed decisions.", order: 2 },
                    { id: "us-3", title: "Select Voting Method", description: "Decide between Mail-in/Absentee, Early In-person, or Day-of polling based on your schedule and state laws.", order: 3 },
                    { id: "us-4", title: "Prepare Identification", description: "Secure the photo ID or non-photo identity documents (like a utility bill) required by your specific state's voting laws.", order: 4 },
                    { id: "us-5", title: "Confirm Polling Precinct", description: "Locations can change. Use the Secretary of State website to find your designated polling place or ballot drop box.", order: 5 },
                    { id: "us-6", title: "Official Check-in", description: "Identify yourself to poll workers. They will verify your eligibility, have you sign the poll book, and hand you a ballot or access card.", order: 6 },
                    { id: "us-7", title: "Mark Your Ballot", description: "In a private booth, use the provided marking device to fill in your choices on the paper or electronic ballot.", order: 7 },
                    { id: "us-8", title: "Final Review (Spoilage)", description: "Double-check your marks. If you make a mistake, do not cross it out; ask a poll worker for a fresh 'spoiled' ballot instead.", order: 8 },
                    { id: "us-9", title: "Submission (Optical Scanner)", description: "Insert your marked ballot into the optical scanner or submit it to the voting machine until it is officially accepted.", order: 9 },
                    { id: "us-10", title: "Claim 'I Voted' Sticker", description: "Pick up your participation sticker and celebrate your role in shaping the future of your community.", order: 10 }
                ]
            };
        }

        console.log(`[ProcessService] Returning 7 General steps`);
        return {
            mode: "general",
            steps: [
                { id: "gen-1", title: "Verify Eligibility", description: "Ensure you meet age, citizenship, and residency criteria for your current location.", order: 1 },
                { id: "gen-2", title: "Registration Process", description: "Submit your voter registration form before the local deadline via official portals.", order: 2 },
                { id: "gen-3", title: "Policy & Candidate Research", description: "Research candidate platforms and non-partisan voter guides to understand the issues on the ballot.", order: 3 },
                { id: "gen-4", title: "Identify Polling Logistics", description: "Locate your official polling station and confirm its operating hours for Election Day.", order: 4 },
                { id: "gen-5", title: "Gather Required Identity Proof", description: "Prepare the specific identification documents mandated by your local electoral commission.", order: 5 },
                { id: "gen-6", title: "Cast Secret Ballot", description: "Follow booth instructions to mark and submit your ballot privately and securely.", order: 6 },
                { id: "gen-7", title: "Confirm Results", description: "Monitor official election commission reports for the finalized and audited results of the vote.", order: 7 }
            ]
        };
    }
}
