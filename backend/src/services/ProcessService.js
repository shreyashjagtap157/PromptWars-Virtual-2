"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessService = void 0;
class ProcessService {
    static getProcessForRegion(region) {
        if (region && region.toLowerCase() === 'india') {
            return {
                mode: "region-specific",
                steps: [
                    { id: "in-1", title: "Check Voter List (ECI)", description: "Ensure your name is present in the electoral roll.", order: 1 },
                    { id: "in-2", title: "Find EPIC Number", description: "Locate your Voter ID card number.", order: 2 },
                    { id: "in-3", title: "Find Polling Booth", description: "Use the ECI portal to find your designated booth.", order: 3 },
                    { id: "in-4", title: "Cast Vote via EVM", description: "Press the button next to your candidate on the Electronic Voting Machine.", order: 4 }
                ]
            };
        }
        if (region && region.toLowerCase() === 'us') {
            return {
                mode: "region-specific",
                steps: [
                    { id: "us-1", title: "Check Registration", description: "Verify your voter registration status in your state.", order: 1 },
                    { id: "us-2", title: "Mail-in / Early Voting", description: "Request an absentee ballot or find early voting locations.", order: 2 },
                    { id: "us-3", title: "Election Day", description: "Head to your local polling place to cast your ballot.", order: 3 }
                ]
            };
        }
        return {
            mode: "general",
            steps: [
                { id: "gen-1", title: "Voter Registration", description: "Ensure you are registered to vote at your current address.", order: 1 },
                { id: "gen-2", title: "Research Ballot", description: "Review candidates and measures.", order: 2 },
                { id: "gen-3", title: "Vote", description: "Cast your ballot.", order: 3 }
            ]
        };
    }
}
exports.ProcessService = ProcessService;
//# sourceMappingURL=ProcessService.js.map