$ErrorActionPreference = "Stop"
$dir = "d:\Project\PromptWars Virtual 2\stitch_assets"
New-Item -ItemType Directory -Force -Path $dir | Out-Null

Write-Host "Downloading Region Selection..."
curl.exe -L "https://lh3.googleusercontent.com/aida/ADBb0uikzCjS3hL_ExnFeh7wOpv7Cv3VO-A3tV1hKZA4DsvSRVS_5CSM6CLMhz8bLvJILBJ8zxOwJUHT7uwnmPyfkVoz7HP7LxYjvvN0dtgzpa6C-1sXw9TxQVNIbugrRsMDxPdPgENw7eF0NvF7YXnEknpysnyCygoi6UY2h4Wbdbl-vcd_9B3pDHyv31r9CT-ISa9q5ZCT3yaosr5mh98r_aqXGwW7pZ1uaRSTAq1XhHKywXRhVcVCEHUlZKs" -o "$dir\region_selection.png"
curl.exe -L "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2E3MzcyNGNmNGYxMDQ3OTU5ZTBiMTQxY2VlMzdiZTFjEgsSBxChhYmwjBsYAZIBIwoKcHJvamVjdF9pZBIVQhM5Mzc4NjY3NTk3MTA5ODQ1OTI5&filename=&opi=89354086" -o "$dir\region_selection.html"

Write-Host "Downloading Landing Page..."
curl.exe -L "https://lh3.googleusercontent.com/aida/ADBb0ujhUDEAatQ9_XOfVmH0rVlULfj4EqiyQsZYW_bsm7PsQ2kz8Cz3imJQ186ELqYsFkRLNTiQEBKh318vadM-uwg7c4aFrsi3ERHNFC20Tb0v_dN2QoEpAUthYqLLVc-_TGhUW50dsfxeQ2_uHXgKBH5YTWmXiTEHh1AE6lvS09cQo07VPme_hSyUZOKWcnaprHkXhnMVkeHqnhu0MeOlA3HKm5XUs9tjK4V7TG-1BzTiwnR4mrWqlJQT5ck" -o "$dir\landing_page.png"
curl.exe -L "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzljZWU0NWFlY2IxNDQ0MzZhZGJiNDRiZWU3YzgzZDg5EgsSBxChhYmwjBsYAZIBIwoKcHJvamVjdF9pZBIVQhM5Mzc4NjY3NTk3MTA5ODQ1OTI5&filename=&opi=89354086" -o "$dir\landing_page.html"

Write-Host "Downloading User Dashboard..."
curl.exe -L "https://lh3.googleusercontent.com/aida/ADBb0uj3bIeHFCyQjEiXSHv1qhBFWSo6ZHInjW4Qo-EOp3hT7j78IuWEO0g_oCjxYvkOaC0al2eI2uD1tVStIo-PuHpmL_uhCMk3QU-b3FnEq_amt2GIDHrAaI7JqfJfEO4nzbN7iTo4fKVpORt82Wx9t0yIIMv_K9udZHZrtf76GUMVSHRlIEhWHzDdEyS3z1lM97uPFtjTfUFqxMrLhGHmfPPl-0GDnT8F8HbNxSmogpHJ09D31groFCUsowE" -o "$dir\user_dashboard.png"
curl.exe -L "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzRmZTlmN2RmZDlkNzQ4YzRhNjViOTJjNWFlZWZkOGYzEgsSBxChhYmwjBsYAZIBIwoKcHJvamVjdF9pZBIVQhM5Mzc4NjY3NTk3MTA5ODQ1OTI5&filename=&opi=89354086" -o "$dir\user_dashboard.html"

Write-Host "Downloading Election Explainer..."
curl.exe -L "https://lh3.googleusercontent.com/aida/ADBb0uhuyxTz8pcpm27REbz6fKLEUtVqjRovGq35-UDWtOrxKujITcunRiebufn13wQrMOOQ17EIGXbC-7sNmGm2irNAxelVCOjf1nICdj93c_DcOM82GW3kZKNI2YzbojA2UbNVp4UduAsXOfl-PnqwbA-SxjduzHvnHzJL0Fxw9csaGEnKzI3bVTgl1kWyyCfBCpXeXehKo7dFiIXQNr-tjeLFI_pXaOYwlFbFKSkYZIEJ3FaO78DddefgPQ" -o "$dir\election_explainer.png"
curl.exe -L "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzI3Njg1NmUxNzBiMzQ0NjBhYzQ0NTExZDdhZmU1MGU0EgsSBxChhYmwjBsYAZIBIwoKcHJvamVjdF9pZBIVQhM5Mzc4NjY3NTk3MTA5ODQ1OTI5&filename=&opi=89354086" -o "$dir\election_explainer.html"

Write-Host "Done!"
