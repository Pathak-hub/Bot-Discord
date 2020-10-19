const fs = require('fs');
const Discord = require("discord.js");


const client = new Discord.Client();
 
const ytdl = require('ytdl-core');
 require("dotenv").config();
const prefix = "!";
client.once("ready", () => {
  console.log("Ready!");
});
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.content.startsWith(`${prefix}ping`)) {
    message.channel.send("M here.");
  } 
  else if (command === "args-info") {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}!`
      );
    } else if (args[0] === "foo") {
      return message.channel.send("bar");
    }

    message.channel.send(`First argument: ${args[0]}`);
  }
  else if (command === 'avatar') {
    if (!message.mentions.users.size) {
        return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
    }

    const avatarList = message.mentions.users.map(user => {
        return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
    });
    message.channel.send(avatarList);
	}
 
  if (message.content.startsWith('!kick')) {
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}
    const user = message.mentions.users.first();
  
    if (user) {
      
      const member = message.guild.member(user);

      if (member) {
      
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
         
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
        
            message.reply('I was unable to kick the member');
          
            console.error(err);
          });
      } else {
        
        message.reply('That user isn\'t in this guild!');
      }
     
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }




   else if (message.content.startsWith(`${prefix}beep`)) {
    message.reply("hello how r u?");
  } 
  
  else if(message.content.startsWith(`${prefix}totalonline`)){
	message.guild.members.fetch().then(fetchedMembers => {
		const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
	
		message.reply(`There are currently ${totalOnline.size} members online in this guild!`)})}

  else if(message.content.startsWith(`${prefix}help`)){
	  message.reply('I can handle the following  commands.Type !kick@user : To kick a user, !server: to know about server,!prune: to delete messages,!user-info@user: to know about a member,!avatar @user : to knaow about the avatar of a member !totalonline: To know the total members online !play (link): play any youtube vedio with link provided,Thank You')
  }
  else if(message.content === `${prefix}play`){
	  if(!args[1]){
		  message.reply('You need to provide a link')
		 }
		 else  { message.voiceChannel.join().then(connection => {
			const stream = ytdl('<youtubelink>', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);
			
			dispatcher.on('finish', () => voiceChannel.leave());
		})}
  }
 else if (message.content === `${prefix}server`) {
    message.channel.send(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
    );
  } 
  else if (command === 'prune') {
	const amount = parseInt(args[0]) + 1;
	if (isNaN(amount)) {
		return message.reply('that doesn\'t seem to be a valid number.');
	} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		 }
	message.channel.bulkDelete(amount, true).catch(err => {
		console.error(err);
		message.channel.send('there was an error trying to prune messages in this channel!');
	});
}
  else if (message.content === `${prefix}user-info`) {
    message.channel.send(
      `Your username: ${message.author.username}\nYour ID: ${message.author.id}`
    );
  }},
  client.on("guildMemberAdd",member=>{
	  const guild = member.guild;
	  console.log('Guild is ' + guild + ' and member is ' + member.user)
    guild.defaultChannel.message(`Bienvenue ${member.user} sur mon serveur Discord !  `).catch(console.error);
  }),

client.login(process.env.DISCORD_BOT_TOKEN))
