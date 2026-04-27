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
        const cleanRegion = (region || '').toLowerCase().trim();
        console.log(`[ProcessService] Exhaustive Guide Engine executing for: "${cleanRegion}"`);

        // Exact 13-step India Roadmap
        if (cleanRegion.includes('india')) {
            return {
                mode: "region-specific",
                steps: [
                    { id: "in-1", title: "voters.eci.gov.in Name Search", description: "Verify your Part Number, Serial Number, and Voter ID status on the official ECI portal. Ensure no 'Deleted' flags are present.", order: 1 },
                    { id: "in-2", title: "Download Official Information Slip", description: "Get your digital slip containing booth details, room numbers, and local precinct identifiers.", order: 2 },
                    { id: "in-3", title: "Digital EPIC (Voter ID) Download", description: "Download your e-EPIC. Note that 11 other IDs like Aadhaar or Passport are also valid for entry.", order: 3 },
                    { id: "in-4", title: "Locate Polling Booth via Map", description: "Identify the school or government building designated as your booth. Plan for a morning visit to avoid heat and long queues.", order: 4 },
                    { id: "in-5", title: "Candidate KYC App Check", description: "Install the 'Know Your Candidate' app. Review criminal records, assets, and liabilities of all contestants in your area.", order: 5 },
                    { id: "in-6", title: "Queue Management & Verification", description: "Stand in the designated queue. Keep your ID and Voter Slip ready for the first check at the door.", order: 7 },
                    { id: "in-7", title: "First Polling Officer: Identity", description: "The 1st Officer checks your name against the marked electoral roll copy and verifies your photo identity.", order: 8 },
                    { id: "in-8", title: "Second Polling Officer: 17A Sign", description: "The 2nd Officer records your details in Form 17A (Register of Voters) and takes your thumb impression or signature.", order: 9 },
                    { id: "in-9", title: "Indelible Ink Application", description: "The 2nd Officer applies the indelible violet ink to your left index finger. Do not wipe it off; it must dry as legal proof.", order: 10 },
                    { id: "in-10", title: "Third Polling Officer: Activation", description: "The 3rd Officer collects your voter slip and presses the 'Ballot' button on the Control Unit to activate the EVM.", order: 11 },
                    { id: "in-11", title: "Cast Ballot (EVM Selection)", description: "Enter the private cubicle. Press the blue button on the Ballot Unit next to the candidate/symbol of your choice.", order: 12 },
                    { id: "in-12", title: "VVPAT Window Verification", description: "Observe the VVPAT window for 7 seconds. A paper slip with your choice will appear, stay visible, then drop into the box.", order: 13 },
                    { id: "in-13", title: "Exit & Selfie Point", description: "Follow the exit signs. Visit the local selfie point to celebrate your civic duty with your inked finger.", order: 14 }
                ]
            };
        }

        // Exact 10-step USA Roadmap
        if (cleanRegion.includes('usa') || cleanRegion.includes('united states') || cleanRegion === 'us') {
            return {
                mode: "region-specific",
                steps: [
                    { id: "us-1", title: "Secretary of State Portal Check", description: "Verify your registration status, party affiliation, and address at least 30 days before election day.", order: 1 },
                    { id: "us-2", title: "Study Sample Ballot", description: "Review and research all state measures, local props, and candidates. Prepare your choices ahead of time.", order: 2 },
                    { id: "us-3", title: "Finalize Voting Method", description: "Choose between Mail-in (Request absentee), Early Voting, or Day-of polling based on state protocols.", order: 3 },
                    { id: "us-4", title: "Obtain Valid ID Documents", description: "Secure necessary ID (RealID, Bill, or Passport) as per your state's specific Voter ID laws.", order: 4 },
                    { id: "us-5", title: "Locate Designated Precinct", description: "Confirm your precinct or ballot drop-off box. Locations may change due to redistricting.", order: 5 },
                    { id: "us-6", title: "Poll Worker Check-In", description: "State your name and address. Poll workers will verify your status, have you sign the book, and issue a ballot.", order: 6 },
                    { id: "us-7", title: "Ballot Marking (Private Booth)", description: "Use the official marking device. Fill in circles/boxes completely. Do not use your own pen unless specified.", order: 7 },
                    { id: "us-8", title: "Review for Overvotes", description: "Verify you haven't marked too many choices for one race. If so, request a 'Spoiled' ballot to start over.", order: 8 },
                    { id: "us-9", title: "Machine Submission", description: "Feed your paper ballot into the optical scanner. Wait for the 'Thank You' or 'Ballot Accepted' message.", order: 9 },
                    { id: "us-10", title: "Participation Sticker", description: "Collect your 'I Voted' sticker and inspire others to complete their civic duty.", order: 10 }
                ]
            };
        }

        // Default General 7-step Protocol
        return {
            mode: "general",
            steps: [
                { id: "gen-1", title: "Eligibility Audit", description: "Verify citizenship and age legalities.", order: 1 },
                { id: "gen-2", title: "Registration Process", description: "Submit details before deadlines.", order: 2 },
                { id: "gen-3", title: "Platform Research", description: "Review candidate policies.", order: 3 },
                { id: "gen-4", title: "Logistics Confirmation", description: "Find station and hours.", order: 4 },
                { id: "gen-5", title: "Identity Preparation", description: "Gather required government photo ID.", order: 5 },
                { id: "gen-6", title: "Ballot Casting", description: "Cast ballot in a secure booth.", order: 6 },
                { id: "gen-7", title: "Result Monitoring", description: "Check verified outcome reports.", order: 7 }
            ]
        };
    }
}
