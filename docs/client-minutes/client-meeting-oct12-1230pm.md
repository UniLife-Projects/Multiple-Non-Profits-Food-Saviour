# Client Meeting Wednesday 12 October 2022

## Attendees

- AbdulAziz Almutlaq
- Harman Sahota
- Maysey Lu
- Jordan Onwuvuche

## Agenda

- Installing / Running virtual machines

## To Do

- [ ] Remind Barbara to push test plans to Github repo

## Minutes

- We aim to create separate virtual machines for everyone working on the project.

- Different groups will be pointing to same IP in web host.

- Exercise caution while working on code in server, avoid using 'sudo reboot'

- Transfer code changes from server, onto your computer and Github, as the server could lose your code

- We'll setup the virtual machines in arbutus cloud - https://arbutus.cloud.computecanada.ca/auth/login/?next=/

- We're using an Apache web server

- We'll be using a GoDaddy domain

- The server only permits access to one IP address, a constraint

- Barbara is out of storage - advised to delete old snapshots

- Having snapshots might cause problems in the virtual machine so they must be deleted at a point.

- Barbara is leaning more towards Django compared to FastAPI

- The upload of images or videos could be expensive in regards to server storage

- As you are coding, if something doesn't run, make sure there's enough space

- When we create a virtual machine, we create a couple of volumes

- We're using named virtual hosts in Apache so everyone can have their own web route, have seperate coding spaces , then go into GoDaddy and Apache configuration and assign them all as records pointing to one IP or create a new server name and assign them all as c names for development group server names and point at the main server (better approach) - group1.healthenow.ca etc.

- We were unable to setup different virtual machines for the groups today

## Creating Volume - Harman Version

1. Volumes -> create a volume -> project-name_boot (demortp_boot) -> source -> image -> ubuntu_20.04.5-focal-x64-2022-08 -> size -> 20gb

2. Launch instance -> name (demortp) -> availability zone -> nova -> next -> select boot source -> Image -> next -> pick second one (p2-3gb)(3gb RAM) -> next -> name of project (rtp-marcolin-network) -> ignore next 2 -> key pairs -> marcolin & add students to have access -> exercise caution so we dont blow away anyone elses work -> push code in git -> servers are volatile can dissappear anytime -> keep a copy in barbs repo.

3. If you have access to keypair barb can login

4. Hit launch instance

5. Volumes -> delete demortp_boot volume

6. Network -> allocate ip -> fill in details (demortp.healthenow.biz)

## Creating Volume - Jordan Version

1. Create volume + name of the project - demortp_boot
2. Volume Source - Image
3. Use Image as a source - Ubuntu-20.04.5-Focal-x64-2022-08 vs Ubuntu-22.04-Jammy
4. Availability Zone - nova
5. Size - 20 GB
6. Under Instances -> Launch Instance (demortp) -> Availability Zone - nova -- Count - 1
7. Under Instances -> Clicked arrow up on Ubuntu-20.04.5-Focal-x64-2022-08 after Selecting 'Image' as under 'Source'
8. Under Instances Flavor -> Selected 20GB of space
9. Under Instances Networks - rpp-marcolin-network - as network name
10. Under Instances Key Pair - she added her own key-pair as it only allows one so she couldn't add that of 'Wade Klaver'
11. > Deleted a volume instance
12. Under Network -> Floating IPs -> Allocate Floating IP -> Pool: Public-Network -- Description - demortp -- DNS Domain - healthenow.biz -- DNS Name - demortp.healthenow.biz
13. Changed Availability zone to 'Persistent_01' from nova
