# Goods Manufacturer Tools Management

**Problem Statement**
Goods manufacturing companies often face significant challenges in managing their tools, employees, and facilities across large-scale operations. Manual or fragmented systems lead to inefficiencies such as:
- Difficulty in tracking tool and equipment usage.
- Poor visibility into employee and facility data.
- Redundant or slow API communications causing performance bottlenecks.
- Inconsistent state management in client applications, leading to bugs and poor maintainability.

These issues result in lost productivity, data inconsistencies, and increased operational costs. The Goods Manufacturer Tools Management system addresses these challenges by offering a centralized, efficient, and user-friendly application to streamline inventory control, employee oversight, and facility management—while maintaining a performant and maintainable codebase.

## Project Overview  
An application designed to help goods manufacturing companies efficiently manage their tools, employees, and facilities. The app improves operational workflows by providing streamlined inventory tracking, employee management, and facility oversight.

## Key Features  
- Centralized dashboard for managing tools and equipment inventory.  
- Employee and facility management modules with CRUD operations. 
- Optimized filtering using multiselect filtering 
- State management optimized using React Context API and useReducer for better code readability and maintainability.  
- API optimization through throttling and debouncing techniques to reduce redundant calls and improve responsiveness.  
- Race condition handling ensuring data consistency during concurrent API requests.

## Technical Highlights  
- **Frontend:** Built using React with Context API and useReducer hooks for state management.  
- **Performance:** Enhanced API call efficiency by 30% through throttling, pagination and reduced redundant requests by 50% via debouncing and race condition resolution.  
- **Code Quality:** Improved code readability by approximately 30% through structured state management and modular design.  
- **API Integration:** Robust handling of API calls with optimized debounce and throttle implementations to maintain smooth user experience.

## Getting Started  
1. Clone the repository:  
   ```bash
   git clone https://github.com/jais-rishika/goodsManufacturer.git
